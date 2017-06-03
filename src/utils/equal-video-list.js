
const equalVideoList = (list1, list2) => {
  if(list1.length != list2.length) {
    return false;
  }
  list1.sort((a,b) => a.snippet.title < b.snippet.title ? -1 : 1);
  list2.sort((a,b) => a.snippet.title < b.snippet.title ? -1 : 1);

  for(let i = 0; i < list1.length; i++) {
    if(list1[i] != list2[i]) {
      return false;
    }
  }

  return true;
}

module.exports = equalVideoList;
