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

  let root = buildTree(arr, 0, arr.length - 1);

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insertNode = (value, node = root) => {
    if (node === null) {
      node = Node(value);
      return node;
    }
    if (value < node.value) {
      node.left = insertNode(value, node.left);
    } else if (value > node.value) {
      node.right = insertNode(value, node.right);
    }
    return node;
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

  const deleteNode = (value, node = root) => {
    if (node === null) {
      return;
    }
    if (value < node.value) {
      node.left = deleteNode(value, node.left);
    } else if (value > node.value) {
      node.right = deleteNode(value, node.right);
    } else {
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.right === null && node.left) {
        node = node.left;
      } else if (node.left === null && node.right) {
        node = node.right;
      } else if (node.left && node.right) {
        node.value = findSuccessor(node.right).value;
      }
    }
    return node;
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
      return noFunc;
    }
  };

  const preorder = (fn = defaultFunc, node = root, noFunc = []) => {
    fn(node, noFunc);
    if (node.left && node.right) {
      preorder(fn, node.left, noFunc);
      preorder(fn, node.right, noFunc);
    }
    if (node === root) {
      return noFunc;
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
      return noFunc;
    }
  };

  const height = (node) => {
    if (!node) {
      return false;
    }
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

  const depth = (node) => {
    if (!node) {
      return false;
    }
    let counter = 0;
    let max = 0;
    const value = node.value;

    const findDepth = (node) => {
      if (node.value === value) {
        max = counter;
      } else if (node.left === null && node.right === null) {
        return;
      }
      counter++;
      if (node.left && node.right) {
        findDepth(node.left);
        findDepth(node.right);
      } else if (node.left && node.right === null) {
        findDepth(node.left);
      } else if (node.right && node.left === null) {
        findDepth(node.right);
      }
      counter--;
    };
    findDepth(root);
    return max;
  };

  const isBalanced = () => {
    let left = root.left ? root.left : 0;
    let right = root.right ? root.right : 0;
    if (height(left) + 1 < height(right) || height(right) + 1 < height(left)) {
      return false;
    }
    return true;
  };

  const rebalance = () => {
    if (!isBalanced()) {
      const newArray = inorder();
      console.log(newArray);
      root = buildTree(newArray, 0, newArray.length - 1);
    }
  };
  return {
    prettyPrint,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    levelOrderRec,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

const newTree = Tree([5, 21, 4, 5, 2, 1, 19, 16, 3]);

newTree.prettyPrint();
newTree.insertNode(13);
newTree.prettyPrint();

newTree.deleteNode(13);
newTree.prettyPrint();

newTree.insertNode(17);
newTree.prettyPrint();

newTree.insertNode(6);
newTree.prettyPrint();

newTree.deleteNode(4);
newTree.prettyPrint();

console.log(newTree.find(3));

newTree.levelOrder((node) => console.log(node.value));
console.log(newTree.levelOrder());
newTree.levelOrderRec((node) => console.log(node.value));
newTree.inorder((node) => console.log(node.value));
console.log(newTree.inorder());
newTree.preorder((node) => console.log(node.value));
console.log(newTree.preorder());
newTree.postorder((node) => console.log(node.value));
console.log(newTree.postorder());
newTree.insertNode(18);
newTree.insertNode(7);
newTree.insertNode(8);
newTree.insertNode(9);
newTree.insertNode(10);
newTree.insertNode(11);
newTree.insertNode(12);


newTree.prettyPrint();
console.log(newTree.height(newTree.find(16)));
console.log(newTree.depth(newTree.find(8)));
console.log(newTree.isBalanced());
console.log(newTree.rebalance());
newTree.prettyPrint();
