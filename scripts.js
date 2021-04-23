$(function() {
  loadProducts();
  $("#products").on("click", ".btn-danger", handleDelete);
  $("#products").on("click", ".btn-warning", handleUpdate);
   $("#addBtn").click(addProduct);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var name = $("#updatename").val();
    var price = $("#updateprice").val();
    var color = $("#updatecolor").val();
    var department = $("#updatedept").val();
    var description = $("#updatedesc").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      data: { name, price, color, department, description },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadProducts();
        $("#updateModal").modal("hide");
      }
    });
  });
});

function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  $.get("https://usman-recipes.herokuapp.com/api/products/" + id, function(
    response
  ) {
    $("#updateId").val(response._id);
    $("#updatename").val(response.name);
    $("#updateprice").val(response.price);
    $("#updatecolor").val(response.color);
    $("#updatedept").val(response.department);
    $("#updatedesc").val(response.description);
    
    $("#updateModal").modal("show");
  });
}

function addProduct() {
  var name = $("#name").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var department = $("#dept").val();
  var description = $("#desc").val();

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, color, department, description },
    success: function(response) {
      console.log(response);
      $("#name").val("");
      $("#price").val("");
      $("#color").val("");
      $("#dept").val("");
      $("#desc").val("");
      loadProducts();
      $("#addModal").modal("hide");
    }
  });
}

function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function() {
      loadProducts();
    }
  });
}

function loadProducts() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    error: function(response) {
      var products = $("#products");
      products.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var products = $("#products");
      products.empty();
      for (var i = 0; i < response.length; i++) {
        var pro = response[i];
        products.append(
          `<div class="product" data-id="${pro._id}"><h3>${pro.name}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> <h5>Price:</h5> ${pro.price} <br> <h5>Color:</h5> ${pro.color} <br> <h5>Department:</h5> ${pro.department} <br> <h5>Description:</h5> ${pro.description}</p></div>`
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}