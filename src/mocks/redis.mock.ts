export class RedisMock {
    private data: Record<string, any> = {};
  
    public async get(key: string): Promise<any> {
      return this.data[key];
    }
  
    public async set(key: string, value: any): Promise<any> {
      this.data[key] = value;
    }
  
    public async del(key: string): Promise<any> {
      delete this.data[key];
    }
}
  