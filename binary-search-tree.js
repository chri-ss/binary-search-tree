// helpers to sort array

const merge = (left, right) => {
  let newArr = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      newArr.push(left[0]);
      left.shift();
    } else {
      newArr.push(right[0]);
      right.shift();
    }
  }

  while (left.length > 0) {
    newArr.push(left[0]);
    left.shift();
  }
  while (right.length > 0) {
    newArr.push(right[0]);
    right.shift();
  }
  return newArr;
};

const mergesort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  let left = arr.slice(0, Math.floor(arr.length / 2));
  let right = arr.slice(Math.floor(arr.length / 2));
  left = mergesort(left);
  right = mergesort(right);

  return merge(left, right);
};

//helper to remove duplicates from array

const removeDuplicates = (arr) => {
  let newArr = [];
  arr.forEach((el) => {
    if (!newArr.includes(el)) {
      newArr.push(el);
    }
  });
  return newArr;
};

//pretty print

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//Node factory

const Node = (value) => {
  let left = null;
  let right = null;
  return { value, left, right };
};

//Tree factory

const Tree = (arr) => {
  arr = removeDuplicates(mergesort(arr));

  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    const newRoot = Node(arr[mid]);

    newRoot.left = buildTree(arr, start, mid - 1);
    newRoot.right = buildTree(arr, mid + 1, end);

    return newRoot;
  };

  const root = buildTree(arr, 0, arr.length - 1);

  const insertNode = (root, value) => {
    if (root === null) {
      root = Node(value);
      return root;
    }
    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }
    return root;
  };

  const findSuccessor = (node) => {
    let temp;
    if (
      (node.left === null && node.right === null) ||
      (node.left === null && node.right)
    ) {
      return node;
    } else if (
      (node.right === null && node.left) ||
      (node.left && node.right)
    ) {
      temp = node.left;
      node.left = null;
      return findSuccessor(temp);
    } else {
      return findSuccessor(node.right);
    }
  };

  const deleteNode = (root, value) => {
    if (root === null) {
      return;
    }
    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      if (root.left === null && root.right === null) {
        root = null;
      } else if (root.right === null && root.left) {
        root = root.left;
      } else if (root.left === null && root.right) {
        root = root.right;
      } else if (root.left && root.right) {
        root.value = findSuccessor(root.right).value;
      }
    }
    return root;
  };

  return { root, insertNode, deleteNode };
};

const newTree = Tree([5, 21, 4, 5, 2, 1, 19, 16, 3]);

prettyPrint(newTree.root);
newTree.insertNode(newTree.root, 13);
prettyPrint(newTree.root);

newTree.deleteNode(newTree.root, 13);
prettyPrint(newTree.root);

newTree.insertNode(newTree.root, 17);
prettyPrint(newTree.root);

newTree.deleteNode(newTree.root, 4);
prettyPrint(newTree.root);
