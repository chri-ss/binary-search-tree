# binary-search-tree
JavaScript program that outputs binary search trees.

## Methods included

- prettyPrint(): Prints a visual representation of the tree to a console.
- insertNode(): Takes an integer value as argument and inserts a node with that value in the tree.
- deleteNode(): Takes an integer value as an argument and deletes it from the tree, if it exists.
- find(): Takes an integer value as an argument and returns an object representation of the node with that value if it exists in the tree.
- levelOrder(): Takes an optional function as argument and applies that function to every node using a level order traversal. Returns an array of values in level order if no function is provided.
- levelOrderRec(): Does the same as above, but using a recursive algorithm.
- inorder(): Takes an optional function as argument and applies that function to every node using an inorder traversal. Returns an array of values inorder if no function is provided.
- preorder(): Takes an optional function as argument and applies that function to every node using a preorder traversal. Returns an array of values preorder if no function is provided.
- postorder(): Takes an optional function as argument and applies that function to every node using a postorder traversal. Returns an array of values postorder if no function is provided.
- height(): Takes a node as argument and returns the number of edges in the longest path from the node to a leaf node.
- depth(): Takes a node as argument and returns the number of edges from the root node of a tree to that node.
- isBalanced(): Returns true if the left subtree height and right subtree height differ by no more than 1.
rebalance(): Rebalances the tree if it is unbalanced.  

