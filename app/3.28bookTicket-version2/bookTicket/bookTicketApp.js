var bookTicket=angular.module('bookTicket')
Boxchecked=true;

//定义对象

function seat(id){
	this.uid=id;
	this.owner="undefine";
	this.isBooked=false;
	this.ismarked=false;
	this.className="defualt";
}

function person(user){
	this.name=user.name;
	this.age=user.age;
	this.phoneNumber=user.phoneNumber;
	this.ticketNumber=user.ticketNumber;
	this.ownSeats=[];
}

function simpleCheck(form){

}




function bookTicket($scope){
	$scope.childAge=12;
	$scope.maxSeatsNumber=30;
	$scope.totalNum=0;
	$scope.totalTempNum=0;
	$scope.master={};
	$scope.mumber=[];
	$scope.tableLow=[0,1,2,3,4];
	$scope.tableRow=[0,1,2,3,4,5];
//seat test
	$scope.seats=[];
	for(var m=1;m<=$scope.maxSeatsNumber;m++){
		$scope.seats.push((new seat(m)));
	}
}



function formCtrl($scope){

	$scope.update=function(users,myform){
		if(myform==false){
			return alert("表单输入错误");
		}
		if($scope.totalNum+users.ticketNumber>$scope.maxSeatsNumber){
			return alert("余票不足");
		}

		$scope.master=new person(users);

		if($scope.master.age>$scope.childAge){
			$scope.master.isChild=false;
		}else{
			$scope.master.isChild=true;
		};
		
		$scope.totalNum+=$scope.master.ticketNumber;
		
		for(i=$scope.totalTempNum;i<$scope.totalNum;i++){
			$scope.seats[i].owner=$scope.master.name;
			$scope.seats[i].isBooked=true;
			$scope.master.ownSeats.push($scope.seats[i]);
		}
		$scope.mumber.push($scope.master);	
		$scope.totalTempNum=$scope.totalNum;
		$scope.users='';


		$scope.chooseChild=function(Boxchecked){
			if(!Boxchecked){
				for(j=0;j<$scope.mumber.length;j++){
					if($scope.mumber[j].isChild){
						changeCss($scope.mumber[j].ownSeats,"green");
					}
				}
			}else{
				for(m=0;m<$scope.mumber.length;m++){
					if($scope.mumber[m].isChild){
						changeCss($scope.mumber[m].ownSeats,"defualt");
					}
				}
			}
		}			
	}	
}

function tableCtrl($scope){
	$scope.colorTable=function(index){
		for(i=0;i<$scope.mumber[index].ownSeats.length;i++){
			$scope.mumber[index].ownSeats[i].ismarked=true;
		}
	}

	$scope.uncolorTable=function(index){
		for(i=0;i<$scope.mumber[index].ownSeats.length;i++){
			$scope.mumber[index].ownSeats[i].ismarked=false;
		}
	}

	

	changeCss=function(seats,className){
		for(i=0;i<seats.length;i++){
			seats[i].className=className;
		}
	}
}