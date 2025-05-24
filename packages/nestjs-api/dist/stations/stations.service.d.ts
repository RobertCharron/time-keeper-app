import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';
import { CreateStationDto } from './dto/create-station.dto';
export declare class StationsService {
    private stationsRepository;
    constructor(stationsRepository: Repository<Station>);
    create(createStationDto: CreateStationDto): Promise<Station>;
    findAll(): Promise<Station[]>;
    findOne(id: number): Promise<Station>;
}
