import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('app_data.db');
