window.onload = function (){
	var createTable = document.getElementById("createTable");
	var tr = createTable.children[1].rows;
	var checkInput = document.getElementsByClassName("check");
	var checkAllInput = document.getElementsByClassName("check_all");
	var priceTotle = document.getElementById("footer-priceTotle");
	var selectTotle = document.getElementById("footer-selectTotle");
	var selected = document.getElementById("footer-selected");
	var footer = document.getElementsByClassName("footer");
	var deleteAll = document.getElementById("deleteAll");

	// 计算商品的总价格和数量
	function getTotle(){
		var selectNum = 0;
		var priceNum = 0;
		len = tr.length;
		for(var i = 0; i <  len; i++)
		{
			if(tr[i].getElementsByTagName("input")[0].checked)
			{
				tr[i].className = "on";
				selectNum += parseInt(tr[i].getElementsByTagName("input")[1].value);
				priceNum += parseFloat(tr[i].cells[4].innerHTML);
			}
			else{
				tr[i].className = "";
			}
		}
		selectTotle.innerHTML = selectNum;
		priceTotle.innerHTML = priceNum.toFixed(2);
	}

	// 计算金额的价格总数
	function getSubTotle(tr)
	{
		var tds = tr.cells;
        var price = parseFloat(tds[2].innerHTML);
        var num = parseInt(tr.getElementsByTagName("input")[1].value);
        var subTotle = parseFloat(price * num).toFixed(2);
        tds[4].innerHTML = subTotle;
	}

	// 复选框绑定单击事件
	for(var i = 0, len = checkInput.length; i < len; i++)
	{
		checkInput[i].onclick = function (){
			if(this.className == "check_all")
			{
				for(var j = 0; j < len; j++)
				{
					checkInput[j].checked == this.checked;
				}
			}
			if(this.checked ==false)
			{
				for(var k = 0, len1 = checkAllInput.length; k < len1; k++)
				{
					checkAllInput[k].checked = false;
				}
			}
			getTotle();
		}
	}

	// 控制底部标签的显示
	selected.onclick = function(){
		if(footer.className == "footer")
		{
			footer.className == "footer show";
		}
		else
		{
			footer.className == "footer";
		}
	}

	// 实现加减、删除操作，使用事件代理方法
	for(var i = 0,len2 = tr.length; i < len; i++)
	{
		tr[i].onclick = function (e)
		{
			var e = e || window.event;
			var el = e.srcElement;
			var clsName = el.className;
			var input = this.getElementsByTagName("input")[1];
			var inputValue = parseInt(input.value);
			var reduce = this.getElementsByTagName("span")[1];

			switch(clsName)
			{
				case "body-1-add":
					input.value = inputValue + 1;
					getSubTotle(this);
					break;
				case "body-1-reduce":
					if(inputValue >= 1)
					{
						input.value = inputValue - 1;
					}
					getSubTotle(this);
					break;
				case "delete":
					var conf = confrim("确定删除这个商品吗？");
					if(conf)
					{
						this.parentNode.removeChild(this);
					}
					break;
				default:
					break;
			}
			getSubTotle();
		}
		// 处理手动输入商品的数量
		tr[i].getElementsByTagName("input")[1].onkeyup = function (){
			var val = this.value;
			var tr = this.parentNode.parentNode;
			if( isNaN(val) || val < 0)
			{
				val = 1;
			}
			this.value = val;
			getSubTotle(tr);
		}
	}

	// 全选删除商品
	deleteAll.onclick = function(){
		if(selectTotle != "0")
		{
			var conf = confrim("确定删除这些商品吗？");
			if(conf)
			{
				for(var i = 0, len = tr.length; i < len; i++)
				{
					var input = tr.getElementsByTagName("input")[0];
					if(input.checked)
					{
						tr[i].parentNode.removeChild(tr[i]);
					}
				}
			}
		}
	}

}