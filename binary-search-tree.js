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
      if ((temp.left && temp.right === null) || (temp.left && temp.right)) {
        node.left = temp.left;
      } else if (temp.left === null && temp.right) {
        node.left = temp.right;
      } else {
        node.left = null;
      }
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

  const find = (value, node = root) => {
    if (value === node.value) {
      return node;
    }
    if (node.left === null && node.right === null) {
      return;
    } else if (value < node.value) {
      return find(value, node.left);
    } else if (value > node.value) {
      return find(value, node.right);
    }
  };

  const levelOrder = (fn) => {
    let q = [];
    let noFunc = [];
    q.push(root);
    while (q.length > 0) {
      let node = q.pop();
      if (fn) {
        fn(node);
      } else {
        noFunc.push(node.value);
      }
      if (node.left) {
        q.unshift(node.left);
      }
      if (node.right) {
        q.unshift(node.right);
      }
    }
    return noFunc;
  };

  const levelOrderRec = (fn, node = root, q = []) => {
    q.push(node);
    fn(q.pop());

    if (node.left && node.right) {
      q.unshift(node.left);
      q.unshift(node.right);
    } else if (node.left) {
      q.unshift(node.left);
    } else if (node.right) {
      q.unshift(node.right);
    } else {
      if (q.length < 1) {
        return;
      }
      return levelOrderRec(fn, q.pop(), q);
    }
    return levelOrderRec(fn, q.pop(), q);
  };

  const defaultFunc = (node, arr = []) => {
    arr.push(node.value);
  };

  const inorder = (fn = defaultFunc, node = root, noFunc = []) => {
    if (node.left === null && node.right === null) {
      return fn(node, noFunc);
    }
    if (node.left && node.right) {
      inorder(fn, node.left, noFunc);
      fn(node, noFunc);
      inorder(fn, node.right, noFunc);
    } else if (node.left && node.right === null) {
      inorder(fn, node.left, noFunc);
      fn(node, noFunc);
    } else if (node.right && node.left === null) {
      inorder(fn, node.right, noFunc);
      fn(node, noFunc);
    }
    if (node === root) {
      return console.log(noFunc);
    }
  };

  const preorder = (fn = defaultFunc, node = root, noFunc = []) => {
    fn(node, noFunc);
    if (node.left && node.right) {
      preorder(fn, node.left, noFunc);
      preorder(fn, node.right, noFunc);
    }
    if (node === root) {
      return console.log(noFunc);
    }
  };

  const postorder = (fn = defaultFunc, node = root, noFunc = []) => {
    if (node.left === null && node.right === null) {
      return fn(node, noFunc);
    }
    if (node.left && node.right) {
      postorder(fn, node.left, noFunc);
      postorder(fn, node.right, noFunc);
      fn(node, noFunc);
    }
    if (node === root) {
      return console.log(noFunc);
    }
  };

  const height = (node) => {
    let counter = 0;
    let max = 0;

    const findHeight = (node) => {
      if (node.left === null && node.right === null) {
        if (max < counter) {
          max = counter;
        }
      }
      counter++;
      if (node.left && node.right) {
        findHeight(node.left);
        findHeight(node.right);
      } else if (node.left && node.right === null) {
        findHeight(node.left);
      } else if (node.right && node.left === null) {
        findHeight(node.right);
      }
      counter--;
    };

    findHeight(node);
    return max;
  };
  return {
    root,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    levelOrderRec,
    inorder,
    preorder,
    postorder,
    height,
  };
};

const newTree = Tree([5, 21, 4, 5, 2, 1, 19, 16, 3]);

prettyPrint(newTree.root);
newTree.insertNode(newTree.root, 13);
prettyPrint(newTree.root);

newTree.deleteNode(newTree.root, 13);
prettyPrint(newTree.root);

newTree.insertNode(newTree.root, 17);
prettyPrint(newTree.root);

newTree.insertNode(newTree.root, 6);
prettyPrint(newTree.root);

newTree.deleteNode(newTree.root, 4);
prettyPrint(newTree.root);

console.log(newTree.find(3));

// newTree.levelOrder((node) => console.log(node.value));
// console.log(newTree.levelOrder());
// newTree.levelOrderRec((node) => console.log(node.value));
newTree.inorder((node) => console.log(node.value));
newTree.inorder();
newTree.preorder((node) => console.log(node.value));
newTree.preorder();
newTree.postorder((node) => console.log(node.value));
newTree.postorder();
newTree.insertNode(newTree.root, 18);
newTree.insertNode(newTree.root, 7);
newTree.insertNode(newTree.root, 8);
newTree.insertNode(newTree.root, 9);
newTree.insertNode(newTree.root, 10);

prettyPrint(newTree.root);
console.log(newTree.height(newTree.find(16)));
