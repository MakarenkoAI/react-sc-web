import { nanoid } from 'nanoid';
import {
  ScAddr,
  ScConstruction,
  ScEventParams,
  ScEventType,
  ScTemplate,
  ScType,
} from 'ts-sc-client';
import { client, scUtils } from '@api/sc';
import { snakeToCamelCase } from '@utils';

type ScTemplateParamValue = string | ScAddr | ScType;
type ScTemplateParam = [ScTemplateParamValue, string] | ScTemplateParamValue;

export class Action {
  public actionNodeAlias: string;

  private action: string;
  private template: ScTemplate;
  private actionNodeInited: Promise<void>;
  private onFirstTripleAdded: () => void;

  constructor(action: string) {
    this.actionNodeAlias = nanoid(10);
    this.action = action;
    this.template = new ScTemplate();

    this.onFirstTripleAdded = () => undefined;
    this.actionNodeInited = new Promise((resolve) => (this.onFirstTripleAdded = resolve));

    this.addFirstTripple();
  }

  private addFirstTripple = async () => {
    const { question } = await scUtils.findKeynodes('question');
    this.onFirstTripleAdded();
    this.template.triple(question, ScType.EdgeAccessVarPosPerm, [
      ScType.NodeVar,
      this.actionNodeAlias,
    ]);
  };

  private initiateAction = async (actionNode: ScAddr) => {
    const { questionInitiated } = await scUtils.findKeynodes('question_initiated');

    const construction = new ScConstruction();
    construction.createEdge(ScType.EdgeAccessConstPosPerm, questionInitiated, actionNode);
    client.createElements(construction);
  };

  private subscribeToAnswer = async (actionNode: ScAddr, onResponse: () => void) => {
    const { questionFinished } = await scUtils.findKeynodes('question_finished');
    const onActionFinished = (
      _subscibedAddr: ScAddr,
      _arc: ScAddr,
      anotherAddr: ScAddr,
      eventId: number,
    ) => {
      if (anotherAddr.isValid() && anotherAddr.equal(questionFinished)) {
        client.eventsDestroy(eventId);
        onResponse();
      }
    };

    const eventParams = new ScEventParams(actionNode, ScEventType.AddIngoingEdge, onActionFinished);

    client.eventsCreate(eventParams);
  };

  private findResultCircuit = async (actionNode: ScAddr) => {
    const { nrelAnswer } = await scUtils.findKeynodes('nrel_answer');

    const circuitAlias = '_circuit';
    const template = new ScTemplate();

    template.tripleWithRelation(
      actionNode,
      ScType.EdgeDCommonVar,
      [ScType.NodeVarStruct, circuitAlias],
      ScType.EdgeAccessVarPosPerm,
      nrelAnswer,
    );
    const result = await client.templateSearch(template);

    if (result.length) return result[0].get(circuitAlias);
    return null;
  };

  private generateAction = async () => {
    const generationResult = await client.templateGenerate(this.template, {});

    if (generationResult && generationResult.size > 0) {
      return generationResult.get(this.actionNodeAlias);
    }
    return null;
  };

  public addToTemplate = async (cb: (template: ScTemplate) => void | Promise<void>) => {
    await this.actionNodeInited;
    await cb(this.template);
  };

  public addArgs = async (...args: [ScTemplateParam, ...ScTemplateParam[]]) => {
    await this.actionNodeInited;
    const rrelBaseKeynodes = args.map((_, ind) => `rrel_${ind + 1}`) as [string, ...string[]];
    const rrelKeynodes = await scUtils.findKeynodes(...rrelBaseKeynodes);

    args.forEach((rrel, ind) => {
      this.template.tripleWithRelation(
        this.actionNodeAlias,
        ScType.EdgeAccessVarPosPerm,
        rrel,
        ScType.EdgeAccessVarPosPerm,
        rrelKeynodes[`rrel${ind + 1}`],
      );
    });
  };

  public initiate = () => {
    return new Promise<ScAddr | null>((resolve) => {
      scUtils.findKeynodes(this.action).then(async (keynodes) => {
        await this.actionNodeInited;

        this.template.triple(
          keynodes[snakeToCamelCase(this.action)],
          ScType.EdgeAccessVarPosPerm,
          this.actionNodeAlias,
        );

        const actionNode = await this.generateAction();
        if (!actionNode) return resolve(null);

        const onResponse = async () => {
          resolve(await this.findResultCircuit(actionNode));
        };
        await this.subscribeToAnswer(actionNode, onResponse);
        await this.initiateAction(actionNode);
      });
    });
  };
}
