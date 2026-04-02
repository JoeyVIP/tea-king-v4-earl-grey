const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

// 讀取 CMS 資料
const data = JSON.parse(fs.readFileSync('cms-data.json', 'utf-8'));

// 掃描 templates/ 目錄
const templatesDir = path.join(__dirname, 'templates');
if (!fs.existsSync(templatesDir)) {
  console.log('templates/ 目錄不存在，略過重建');
  process.exit(0);
}

const templates = fs.readdirSync(templatesDir)
  .filter(f => f.endsWith('.mustache'));

if (templates.length === 0) {
  console.log('沒有找到 .mustache 模板，略過重建');
  process.exit(0);
}

templates.forEach(templateFile => {
  const template = fs.readFileSync(
    path.join(templatesDir, templateFile), 'utf-8'
  );

  // 將巢狀資料打平供 Mustache 使用
  const flatData = {};
  for (const [sectionKey, sectionData] of Object.entries(data)) {
    if (typeof sectionData === 'object' && sectionData !== null) {
      for (const [fieldKey, fieldValue] of Object.entries(sectionData)) {
        flatData[`${sectionKey}.${fieldKey}`] = fieldValue;
      }
    }
    flatData[sectionKey] = sectionData;
  }

  const html = Mustache.render(template, flatData);

  // 去掉 .mustache 後綴
  const outputFile = templateFile.replace('.mustache', '');
  fs.writeFileSync(outputFile, html, 'utf-8');
  console.log(`已重建: ${outputFile}`);
});

console.log('重建完成！');
