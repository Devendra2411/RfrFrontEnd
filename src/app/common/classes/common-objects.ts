import {SSOObject} from '../interfaces/sso-object';

export class Workflow {
  siteName: string;
  trainId: number;
  workflowName: string;
  equipSerialNumber: string;
  outageId: number;
  assignedEngineers: SSOObject[];

  constructor(equipSerialNumber: number, outageId: number, assignedEngineers: SSOObject[]) {
  }
}
