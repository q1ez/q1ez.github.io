var sh=SpreadsheetApp.openById("1F6l4xqtC2xwj9KScobfVhWnrlHYAImO-CuEYKTFoHTs").getSheetByName("History")
function doGet() {
    return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport','width=device-width,initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function insert(date,score,dur){
  sh.insertRowsBefore(2, 1).getRange(2,1,1,3).setValues([[date,score,dur]]);
  return true;
}
function get(){
  var lastRow = sh.getLastRow();
  if (lastRow>1) {
    const data=sh.getRange(2, 1,lastRow-1,sh.getLastColumn()).getValues();
  return data.map(r =>`<tr>${r.map(c=>`<td>${c}</td>`)}</tr>`);
  }else   return ''
  
}
function cache(data) {
  var cache = CacheService.getUserCache();
  var cachedData = cache.get('cache');
  if (cachedData) return cachedData;
  cache.put('cache',data,2592000);
  return data;
}
function P(k,v){
  var uP = PropertiesService.getUserProperties();
  var uPPs = uP.getProperties()
  if(JSON.stringify(uPPs)==='{}'){
  uP.setProperties({
    sco:'0/0 0%',
    cor:'0',
    tst:false,
    dur:'PT2H',
    inc:'0',
    cdt:'PT2H',
  })
}
  if(typeof k==='undefined')  return JSON.stringify(uPPs);
  else if(typeof k==='object')  uP.setProperties(k)
  else if (!v)                return uP.getProperty(k)
  else                        uP.setProperty(k,v)
}
function del(num) {
  console.log('del',num)
  sh.deleteRow(Number(num));
}