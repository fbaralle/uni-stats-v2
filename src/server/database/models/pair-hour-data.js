import { ObjectId } from 'mongodb';
import dbClient, { getDb } from 'server/database/mongodb-client';
import { getFeesNumber } from 'utils/uniswap';

export default class PairHourData {
  constructor({
    snapshotId,
    pairId,
    hourStartUnix,
    reserveUSD,
    hourlyVolumeUSD,
  }) {
    this._id = snapshotId;
    this.pairId = pairId;
    this.hourStartUnix = hourStartUnix;
    this.reserveUSD = reserveUSD;
    this.feesUSD = hourlyVolumeUSD && getFeesNumber(hourlyVolumeUSD);
    this.hourlyVolumeUSD = hourlyVolumeUSD;
  }

  async saveOne() {
    try {
      const { db: clientDb, client } = await getDb();
      const dbOpResult = await clientDb
        .collection('pair-hour-data')
        .insertOne(this);

      await client.close();
      console.log('New entry saved', { data: this, id: dbOpResult.insertedId });
      return dbOpResult;
    } catch (e) {
      throw new Error('Saving failed', e);
    }
  }

  static async saveMany(pairHourDatas) {
    try {
      const { db: clientDb, client } = await getDb();
      const dbOpResult = await clientDb
        .collection('pair-hour-data')
        .insertMany(pairHourDatas);
      await client.close();
      console.log('New entry array saved', { data: pairHourDatas });
      return dbOpResult;
    } catch (e) {
      throw new Error('Saving failed', e);
    }
  }

  static async findLastEntriesByPairId(pairId, opts = {}) {
    try {
      const { db: clientDb, client } = await getDb();
      const dbOpResult = await clientDb
        .collection('pair-hour-data')
        .find({ pairId }, opts)
        .sort({ hourStartUnix: 'desc' })
        .toArray();
      await client.close();
      return dbOpResult;
    } catch (e) {
      throw new Error('[ERROR] findByPairId', e);
    }
  }
}
