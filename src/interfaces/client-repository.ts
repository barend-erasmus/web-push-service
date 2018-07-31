import { Client } from "../models/client";

export interface IClientRepository {
  find(key: string): Promise<Client>;

  insert(client: Client): Promise<void>;
}
