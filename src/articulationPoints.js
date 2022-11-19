$matrixAdj = [];
// on cree le tableau bleu, contenant les lignes
$nbVertexes= 5;
$vertexes=[];
$nbCc=0;
//$pointArticul=[];
$Nodes=[];
var $cy;
$(document).ready(function(){
  $('#nbNode').keypress(function (e) {
   var key = e.which;
   if(key == 13)  // the enter key code
    {
      $nbVertexes= i=$("#nbNode").val();
      initMatrix();
      createNodes();
      initGraph();
    }
  });
  $('#SecondNode').keypress(function (e) {
   var key = e.which;
   if(key == 13)  // the enter key code
    {
      var i,j;
       i=$("#FirstNode").val();
       j=$("#SecondNode").val();
        $matrixAdj[i-1][j-1]=1;
        $matrixAdj[j-1][i-1]=1;
        updateEdges(i,j);
    }
  });
  $("#valider").click(function(){
    initVertexes();
    $nbCc=NCC(-1);//Initial number of CC
      articulationPoints();

  });
});
function initMatrix(){
  var i,j;
 for(i = 0; i < $nbVertexes; i++){
     $matrixAdj[i] = [];
     for(j = 0; j < $nbVertexes; j++){
        {$matrixAdj[i][j] = 0;
        }
     }
 }
}
function initVertexes(){
  var i=0;
  $vertexes=[];
  for (i=0;i<$nbVertexes;i++)
  $vertexes[i]=false;
}
function DFS($vertex,$vertexNotV){
  var pile=[];
  pile.push($vertex);
  var i;
  while (pile.length>0)
    {
        // pop
        $vertex=pile.pop();
        //alert('poping '+$vertex);
        if ($vertexes[$vertex]==false){
            //alert('Visiting '+$vertex);
           $vertexes[$vertex]=true;//Visited
           for (i=0;i<$vertexes.length;i++)
           {
             if (i!=$vertexNotV)
               if($matrixAdj[$vertex][i]==1)
                if($vertexes[i]==false){
                  //alert('pushing '+i);
                   pile.push(i);
                 }
           }
         }
    }
}
function NCC($vertexNotV){
   var nbCCtmp=0;
   var i;
   for(i=0;i<$vertexes.length;i++)
     if(i!=$vertexNotV)
       if($vertexes[i]==false)
        {
          DFS(i,$vertexNotV);
         nbCCtmp++;
       }
        return nbCCtmp;
}
function articulationPoints(){
  var i;
  var k=0;
  for (i=0;i<$vertexes.length;i++)
    {
      initVertexes();
      var tmpCC=NCC(i);
      // if (tmpCC!=$nbCc)
      if (tmpCC>$nbCc)
         { //$pointArticul[k]=i+1;
           console.log(i);
           ColorArtPoit(i);//Color the articulation vertex
           k++;
         }
    }
}
function createNodes(){
    $Nodes=[]; //Initialize Nodes Matrix
    for (var i = 0; i<$nbVertexes; i++) {
        $Nodes.push({
            data: {
                id: i+1,
                name:i+1
            }
        });
    }
}
function updateEdges(FirstNode,SecondNode){
  $cy.add({
    group: "edges",
    data: {source:FirstNode,
    target:SecondNode },
});
}
function initGraph(){
  var Style =  cytoscape.stylesheet().selector('node').css({
    'background-color': '#f1982e',
    'label': 'data(id)',
    'color':'#ffffff'
      }).selector('edge').css({
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      })
 $cy=cytoscape({
   container: $('#graph-container'),
    elements:{
       nodes: $Nodes,
    },
    style:Style,
    layout: {
      name: 'random',
    },
 });
}
function ColorArtPoit($i){
    $cy.nodes()[$i].css({
    'background-color': '#27ae60'
     });
}
