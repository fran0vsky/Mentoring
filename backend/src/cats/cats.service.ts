import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface CatRow {
  id: number;
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class CatsService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_ANON_KEY');
    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
    }
    this.supabase = createClient(url, key);
  }

  async getAll(): Promise<{ data: CatRow[] }> {
    const { data, error } = await this.supabase
      .from('cats')
      .select('id, name, age, breed')
      .order('id');
    if (error) throw error;
    return { data: data ?? [] };
  }

  async getOneRandom(): Promise<{ data: CatRow | null }> {
    const { data: rows } = await this.getAll();
    const random =
      rows.length > 0 ? rows[Math.floor(Math.random() * rows.length)] : null;
    return { data: random };
  }
}
