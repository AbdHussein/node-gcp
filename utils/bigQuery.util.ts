import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: 'my-project',
  keyFilename: '../service-account.json',
});

async function insertLogs(logs: Array<{ timestamp: string; log_level: string; message: string }>) {
  const datasetId = 'MyFirstDataset';
  const tableId = 'MyFirstTable';

  // Insert data into a table
  await bigquery.dataset(datasetId).table(tableId).insert(logs);
  console.log(`Inserted ${logs.length} rows`);
}

export default insertLogs;
