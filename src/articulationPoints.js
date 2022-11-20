var $matrixAdj = []
// on cree le tableau bleu, contenant les lignes
var $nbVertexes= 10;
var $vertexes=[];
var $nbCc=0;
var $cy ;
//$pointArticul=[];
// $Nodes=[];
// var $cy;

function  articulationSolve(cy,matrixAdj){
    $matrixAdj = matrixAdj;
    $cy = cy;
    initVertexes();
    $nbCc=NCC(-1);//Initial number of CC
    articulationPoints();
  };
function initMatrix(){
  var i,j;
  const $matrixAdj = [];
 for(i = 0; i < $nbVertexes; i++){
     $matrixAdj[i] = [];
     for(j = 0; j < $nbVertexes; j++){
        {$matrixAdj[i][j] = 0;
        }
     }
 }
 return $matrixAdj;
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
    // console.log($matrixAdj);
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
        //  console.log(`nbcctmp ${nbCCtmp}`);
       }
        return nbCCtmp;
}
function articulationPoints(){
  var i;
  var selected = []
  var k=0;
  for (i=0;i<$vertexes.length;i++)
    {
      initVertexes();
      var tmpCC=NCC(i);
      // if (tmpCC!=$nbCc)
      if (tmpCC>$nbCc)
         { //$pointArticul[k]=i+1;
           selected.push(i);
           ColorArtPoint(i);//Color the articulation vertex
           k++;
         }
    }
    console.log(selected);
}
function ColorArtPoint($i){
  $cy.nodes()[$i].css({
  'background-color': '#27ae60'
   });
}
export {articulationSolve,initMatrix,} ;