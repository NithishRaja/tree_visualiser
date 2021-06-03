var app = Vue.createApp({
  data(){
    return {
      nodes: [
        {
          id: 0,
          key: 112,
          child: 1,
          sibling: -1,
          parent: -1,
          height: 1
        },
        {
          id: 1,
          key: 11,
          child: -1,
          sibling: 2,
          parent: 0,
          height: 2
        },
        {
          id: 2,
          key: 12,
          child: -1,
          sibling: -1,
          parent: 0,
          height: 2
        }
      ],
      newNode: "",
      newParent: "",
      addNode: false,
      displayLines: false
    }
  },
  computed: {
    // Fuction to return coorfinates for lines
    getCoordinates(){
      // Initialise empty array
      temp = []
      // Iterate over all nodes
      for(var i=0;i<this.nodes.length;++i){
        // Check if node has parent
        if(this.nodes[i].parent != -1){
          // Get the DOM elements for current node and its parent
          first = document.getElementById(this.nodes[i].id)
          second = document.getElementById(this.nodes[this.nodes[i].parent].id)
          body = document.getElementById("body")
          // Get the coordinates of currnet node and parent
          first = first.getBoundingClientRect();
          second = second.getBoundingClientRect();
          body = body.getBoundingClientRect();
          tempObj = {
            'first': {
              'x': (first.left - body.left) + first.width/2,
              'y': (first.top - body.top) + first.height/2
            },
            'second': {
              'x': (second.left - body.left) + second.width/2,
              'y': (second.top - body.top) + second.height/2
            }
          }
          // Push object into array
          temp.push(tempObj)
        }
      }
      // Return array
      return temp
    }
  },
  methods: {
    // Function to return height of tree
    height(){
      // Initialise variable for height
      max = 0;
      // Iterate over all nodes
      for(var i=0;i<this.nodes.length;++i){
        // If current node's height is greater than 'max', update max
        if(this.nodes[i].height > max){
          max = this.nodes[i].height
        }
      }
      // Return height
      return max;
    },
    // Function to return all nodes at a given height
    getNodes(currentHeight){
      // Initialise array to hold all the nodes
      temp = [];
      // Iterate over all nodes
      for(var i=0;i<this.nodes.length;++i){
        // Push nodes at required height into array
        if(this.nodes[i].height == currentHeight){
          temp.push(this.nodes[i]);
        }
      }
      // Sort elements based on parent id
      temp.sort(function(a, b){
        if(a.parent > b.parent){
          return 1;
        }
        if(a.parent < b.parent){
          return -1;
        }
        return 0;
      });
      // Return array
      return temp;
    },
    // Function to add a new node
    addNewNode(){
      // console.log("parent", this.newParent, "key", this.newNode);
      node = {
        id: this.nodes.length,
        key: this.newNode,
        child: -1,
        sibling: -1,
        parent: this.parent,
        height: 1
      }
      // Check if tree has a root
      if(this.newParent == -1){
        // Create root node
        this.nodes.push(node);
      }else{
        // Check if parent has child
        if(this.nodes[this.newParent].child == -1){
          // Update child pointer of parent
          this.nodes[this.newParent].child = this.nodes.length;
          // Update parent pointer of node
          node.parent = this.newParent;
          // Update node height
          node.height = this.nodes[this.newParent].height + 1;
          // Push new node into list
          this.nodes.push(node);
        }else{
          // Get rightmost child of parent
          var temp = this.nodes[this.newParent].child;
          while(true){
            if(this.nodes[temp].sibling == -1){
              break;
            }
            temp = this.nodes[temp].sibling;
          }
          // Update sibling
          this.nodes[temp].sibling = this.nodes.length;
          // Update parent pointer of node
          node.parent = this.newParent;
          // Update node height
          node.height = this.nodes[this.newParent].height + 1;
          // Push new node into list
          this.nodes.push(node);
        }
      }
      this.newParent = ""
      this.toggleAddNode()
    },
    // Function to update the newParent data
    setNewParent(index){
      this.newParent = index;
      this.displayLines = false;
      this.toggleAddNode();
    },
    // Function to roll back add node process
    cancelInsert(){
      this.newParent = "";
      this.displayLines = true;
      this.toggleAddNode();
    },
    // Function to toggle addNodeboolean
    toggleAddNode(){
      console.log("toggle", this.addNode);
      this.newNode = ""
      this.addNode = !this.addNode
    }
  },
  mounted(){
    this.displayLines = true
  },
  updated(){
    if(this.newParent === ""){
      console.log("here11111r", this.newParent);
      this.displayLines = true
    }else{
      console.log("hererer22222", this.newParent);
      this.displayLines = false
    }
  }
}).mount("body")
