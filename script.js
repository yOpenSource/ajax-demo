$(()=>{
  $('#get-button').on('click',()=>{
    $.ajax({
      url:'/products',
      contentType:'application/json',
      success:function(res){
        let tbody = $('tbody');
        tbody.html('');
        res.products.forEach(function(element,index){
          tbody.append('<tr><td class="id">'+element.id+'</td><td>'+'<input class="name" value="'+element.name+'">'+'</td><td><button class="update-button">PUT</button><button class="delete-button">del</button></td></tr>');
        });
      }
    });
  });

  $('#create').on('click',(event)=>{
    let input = $('#create-input');
    $.ajax({
      url : '/products',
      method : 'POST',
      contentType:'application/json',
      data:JSON.stringify({name: input.val()}),
      success : function(res){
        console.log(res);
        input.val('');
        $('#get-button').click();
      }
    });
  });

  $('table').on('click','.update-button',function(){
    let tr=$(this).closest('tr');
    let id=tr.find('.id').text();
    let newName = tr.find('.name').val();
    $.ajax({
      url:'/products/'+id,
      method:'PUT',
      contentType:'application/JSON',
      data:JSON.stringify({newName:newName}),
      success:function(res){
        console.log(res);
        $('#get-button').click();
      }
    });
  });

  $('table').on('click','.delete-button',function(){
    let tr=$(this).closest('tr');
    let id=tr.find('.id').text();
    $.ajax({
      url:'/products/'+id,
      method:'DELETE',
      contentType:'application/JSON',
      success:function(res){
        console.log(res);
        $('#get-button').click();
      }
    });

  });
  

});
