import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { CatRow } from "./cats.row";

@Injectable()
export class CatsService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>("SUPABASE_URL");
    const key = this.config.get<string>("SUPABASE_ANON_KEY");
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
    }
    this.supabase = createClient(url, key);
  }

  async getAll(): Promise<{ data: CatRow[] }> {
    const { data, error } = await this.supabase
      .from("cats")
      .select("id, name, age, breed")
      .order("id");
    if (error) throw error;
    return { data: data ?? [] };
  }

  async addOne(payload: {
    name: string;
    age: number;
    breed: string;
  }): Promise<CatRow> {
    const { data, error } = await this.supabase
      .from("cats")
      .insert(payload)
      .select("id, name, age, breed")
      .single();
    if (error) throw error;
    return data as CatRow;
  }

  async removeOne(id: number): Promise<void> {
    const { error } = await this.supabase.from("cats").delete().eq("id", id);
    if (error) throw error;
  }
}
