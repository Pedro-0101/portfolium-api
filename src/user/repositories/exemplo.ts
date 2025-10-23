/*import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consulta, ConsultaDocument } from '../Schema/consulta.schema';
import { Model } from 'mongoose';
import { ConsultaDto } from '../dtos/consulta.dto';

@Injectable()
export class CreateConsultaRepository {
  constructor(
    @InjectModel(Consulta.name) private consultaModel: Model<ConsultaDocument>,
  ) {}

  async execute(consulta: ConsultaDto): Promise<ConsultaDto> {
    const createdConsulta = new this.consultaModel(consulta);
    await createdConsulta.save();
    return createdConsulta.toObject();
  }
}
*/