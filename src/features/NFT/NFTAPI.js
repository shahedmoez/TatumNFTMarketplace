//-----this section for conecting to bakend and getting collection, liked option, user profile and ...-----

import NFTs from '../../constance/NFTs.json';
import collections from '../../constance/collections.json';
// for get Collection 
export function fetchCollection(name) {
    var colection = collections.list.find( item => item.name === name);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: colection }), 500)
  );
}
// for Like nfts 
export function setLike(props) {
  
}
