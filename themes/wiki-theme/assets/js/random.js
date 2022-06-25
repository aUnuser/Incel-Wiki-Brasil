// From https://github.com/jgreely/hugo-theme-recipe/blob/master/layouts/redirect/baseof.html
// Modded
{{- range $.Site.RegularPages -}}
  {{ $.Scratch.Add "tmp" (slice .RelPermalink) }}
{{- end -}}
{{ $.Scratch.Get "tmp" | jsonify | $.Scratch.Set "tmp" }}

{{- range $.Site.Params.remove_from_random -}}
  {{ $.Scratch.Add "tmp2" (slice . ) }}
{{- end -}}
{{ $.Scratch.Get "tmp2" | jsonify | $.Scratch.Set "tmp2" }}

document.addEventListener("DOMContentLoaded", function () {
    var recipe = {{ $.Scratch.Get "tmp" | safeJS }};
    var todelete = {{ $.Scratch.Get "tmp2" | safeJS }};
    for(var i = 0; i < todelete.length; i++){
        for(var j = 0; j < recipe.length; j++) {
            if(todelete[i] === recipe[j]){
                delete recipe[j];
            }
        }
    }
    recipe = recipe.filter(function(x) { return x !== null }); 
    var index = Math.floor(Math.random() * recipe.length);
    var randomlink = document.getElementsByClassName("random");
    for(var i = 0; i < randomlink.length; i++) {
      randomlink[i].setAttribute("href", recipe[index]);
    }
    
});
