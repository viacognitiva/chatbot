var app = angular.module('MinhaApp', []);

app.controller('myController', function($scope, $http) {
      $scope.respostas=[];
      $scope.outputTabela=[];
      $scope.outputDiv=[];
      $scope.outputEntidade=[];

      $scope.buscar = function() {
     // $scope.passages=false;

            $http.get('/api/nlu/'+$scope.texto+'/'+$scope.url).success(function(data) {

               var retorno = [];
               var retornoEntidade = [];
                console.log('$scope.passages'+data);

                  angular.forEach(data.keywords, function(item){
                          console.log('keywords '+item.text);
                          console.log('relevante '+item.relevance);
                          console.log('emotional '+item.emotion);
                          console.log('entities '+data.language);
                          retorno.push({language: data.language,palavrachave:item.text,relevancia:(item.relevance*100).toFixed(2)});
                  });

                   angular.forEach(data.entities, function(item){
                          console.log('keywords '+item.text);
                          retornoEntidade.push({nome: item.text,tipo:item.type,relevancia:(item.relevance*100).toFixed(2)});
                                            // retorno.push({texto: item.passage_text, file:item1.extracted_metadata.filename});
                  });

                if(retorno.length==0){
                  $scope.errorMessage='Registro não encontrado.';
                } else {
                   $scope.errorMessage='';
                }

                 $scope.outputDiv = retorno;
                 $scope.outputEntidade=retornoEntidade;


             });
      }
      $scope.parJson = function (json) {
         return angular.fromJson(json);
      }

      notIsEmpty = function (data) {
              return JSON.stringify(data, function(key, value) { return value === "" ? false : true });

      }

       $scope.reset = function(){
                 // $scope.successMessage='';
                  $scope.errorMessage='';
                  $scope.outputTabela=[];
                  $scope.outputDiv=[];
                  $scope.outputEntidade=[];
                  $scope.myForm.$setPristine(); //reset Form
                  $scope.texto='';
                  $scope.url='';
       };

       $scope.checkTrecho = function () {
           if ($scope.hasTrecho) {
                console.log("CheckBox is checked.");
           } else {
               console.log("CheckBox is not checked.");
           }
        };

});