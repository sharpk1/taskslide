const fs = require('fs');
const glob = require('glob');
const path = require('path');

async function translateString(str, translateTo, translateInstance) {
  translateInstance.engine = 'google';
  const translatedString = await translateInstance(str, translateTo);
  console.log(translatedString);
  return translatedString;
}

async function main() {
  // Dynamic import
  const translateModule = await import('translate');
  const {default: translate} = translateModule; // Change this based on the actual module structure

  console.log('Current Working Directory: ', process.cwd());

  // Define the paths for your en.json and es.json files.
  const enJsonPath = path.join(__dirname, '../components/translations/en.json');
  const esJsonPath = path.join(__dirname, '../components/translations/es.json');

  // Load the existing translations.
  const enJson = require(enJsonPath);

  // Look for .tsx files under the components folder and its subfolders.
  const files = glob.sync('../components/**/*.{tsx}');

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/t\('(.*?)'\)/g) || [];

    matches.forEach(match => {
      const key = match.replace(/t\('(.*)'\)/, '$1');

      if (!enJson[key]) {
        console.log(`Adding missing key: ${key} in ${file}`);
        enJson[key] = key;
      }
    });
  });

  // Write the updated en.json back to disk.
  fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2));

  // Generate a placeholder es.json based on the keys in en.json.
  const esJson = {};
  for (const key of Object.keys(enJson)) {
    const translated = await translateString(enJson[key], 'es', translate);
    esJson[key] = translated;
  }

  // Write the placeholder es.json to disk.
  fs.writeFileSync(esJsonPath, JSON.stringify(esJson, null, 2));
}

main().catch(error => console.error(error));
