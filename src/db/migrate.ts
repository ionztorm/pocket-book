import { migrate } from 'drizzle-orm/neon-http/migrator';
import '@/../envConfig';
import { db } from '@/db/index';

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: 'src/db/migrations',
		});
		console.log('✅ Migration complete');
	} catch (err) {
		console.error('Error during migration: ', err);
		process.exit(1);
	}
};

main();
