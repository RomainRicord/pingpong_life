import Realm from 'realm';
import { UserSchema } from './schema/UserSchema';

export const realm = new Realm({schema: [UserSchema], deleteRealmIfMigrationNeeded: true});