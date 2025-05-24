import { DataSource } from 'typeorm';
export declare class InitialSeeder {
    private dataSource;
    constructor(dataSource: DataSource);
    run(): Promise<void>;
}
