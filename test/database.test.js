import { describe, expect, it } from 'vitest';
import { connectToDataBase, getdb } from '../data/database';
import { Db } from 'mongodb'; 

describe('database connection', () => {
    it('Connect to the database', async () => {
        await connectToDataBase();
        expect(getdb()).toBeInstanceOf(Db);
      });
    
      it('Database name is "WT"', () => {
        expect(getdb().databaseName).toBe('WT');
      });
    
      it('Insert and retrieve a document', async () => {
        const collection = getdb().collection('testCollection');
        const document = { name: 'John' };
        const insertResult = await collection.insertOne(document);
        const retrievedDocument = await collection.findOne({ _id: insertResult.insertedId });
        expect(retrievedDocument.name).toBe(document.name);
      });
    
      it('Error handling for incorrect URL', async () => {

        const invalidUrl = 'invalid-url';
        try {
          await connectToDataBase(invalidUrl);
        } catch (error) {
          expect(error.message).toContain('invalid URL');
        }
      });

});
