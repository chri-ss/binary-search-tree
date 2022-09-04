import Tree from "./binary-search-tree.js";

const rng = (size) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    let num = Math.floor(Math.random() * 100);
    arr.push(num);
  }
  return arr;
};

const newTree = Tree(rng(10));
newTree.prettyPrint();
console.log(newTree.isBalanced());

newTree.insertNode(106);
newTree.insertNode(134);
newTree.insertNode(117);
newTree.insertNode(156);
newTree.insertNode(187);

newTree.prettyPrint();
console.log(newTree.isBalanced());
newTree.rebalance();
newTree.prettyPrint();
console.log(newTree.isBalanced());

console.log("level-order");
newTree.levelOrder((node) => console.log(node.value));

console.log("inorder");
newTree.inorder((node) => console.log(node.value));

console.log("preorder");
newTree.preorder((node) => console.log(node.value));

console.log("postorder");
newTree.postorder((node) => console.log(node.value));
