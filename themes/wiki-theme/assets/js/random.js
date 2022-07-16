// From https://github.com/jgreely/hugo-theme-recipe/blob/master/layouts/redirect/baseof.html
// Modded
{{ $scratch := newScratch }}
{{- range $.Site.RegularPages -}}
  {{ $scratch.Add "tmp" (slice .RelPermalink) }}
{{- end -}}
{{ $scratch.Get "tmp" | jsonify | $scratch.Set "tmp" }}

{{- range $.Site.Params.removeFromRandom -}}
  {{ $scratch.Add "tmp2" (slice . ) }}
{{- end -}}
{{ $scratch.Get "tmp2" | jsonify | $scratch.Set "tmp2" }}

document.addEventListener("DOMContentLoaded", function () {
  var recipe = {{ $scratch.Get "tmp" | safeJS }};
  var todelete = {{ $scratch.Get "tmp2" | safeJS }};
  var currentPage = window.location.href.replace("{{ .Site.BaseURL }}", "/");
  for(var i = 0; i < recipe.length; i++){
    if(currentPage === recipe[i]){
      delete recipe[i];
    }
    if(todelete) {
      for(var j = 0; j < todelete.length; j++) {
        if(todelete[j] === recipe[i]){
          delete recipe[i];
        }
      }
    }
  }
  console.log(recipe);
  recipe = recipe.filter(function(x) { return x !== null });
  var index = Math.floor(Math.random() * recipe.length);
  var randomlink = document.getElementsByClassName("random-link");
  for(var i = 0; i < randomlink.length; i++) {
    randomlink[i].setAttribute("href", recipe[index]);
  }
});
