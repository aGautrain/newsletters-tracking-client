export interface Newsletter {
  id: number;
  name?: string;
  expeditor: string;
  expectedTimeOfArrival: number;
  lastSent: string;
  toleranceBeforeWarning: number;
  toleranceBeforeError: number;
  criteria: any; // json object with arguments & body, representing a function

  createdAt: number;
  updatedAt: number;

  // attributes added by client project
  status?: NewsletterStatus;
  arrivedToday?: boolean;
  expectedDateTime?: number;

}

export interface ScriptExecutionResult {
  messagesProcessed: number;
  newslettersModified: number;
  newslettersCreated: number;
}


export enum NewsletterStatus {
  SCHEDULED,
  ON_TIME,
  LATE,
  NOT_SENT
}
