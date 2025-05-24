import { DataSource } from 'typeorm';
export declare class SeedCommand {
    private dataSource;
    constructor(dataSource: DataSource);
    seed(): Promise<void>;
}
