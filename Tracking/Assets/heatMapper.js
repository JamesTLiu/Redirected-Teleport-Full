#pragma strict

// The distance allowed to affect 'heat'
var allowableDistance : float = 5;


// How much to adjust the 'heat' by.
var colorAdjuster : float = .2;


// Creates a material from shader&texture references
var texture : Texture;
var color : Color;


// This stops the material from continuously altering color
private var thisCubeDone : boolean = false;


function Start () 
{
    GetComponent.<Renderer>().material = new Material (Shader.Find("Self-Illumin/Diffuse"));
    GetComponent.<Renderer>().material.mainTexture = texture;
    GetComponent.<Renderer>().material.color = color;
    GetComponent.<Renderer>().material.color = Color.blue;
}


function Update()
{
    // Wait till map is finished loading to check nearby marks
    if(readHeatMapData.finished && !thisCubeDone)
        setColor();
}


function setColor()
{
    var heatBoxes : GameObject[] = GameObject.FindGameObjectsWithTag("heatBox");
    for(item in heatBoxes)
    {
        var distCheck = Vector2(item.transform.position.x, item.transform.position.z) - 
                        Vector2(this.transform.position.x, this.transform.position.z);
        var dist = distCheck.sqrMagnitude;
        Debug.Log("Distances " + dist);
        if( dist <= allowableDistance )
        {
            // Here's where the color is actually adjusted.
            // It starts blue (cool) by default and moves towards red (hot)
            GetComponent.<Renderer>().material.color.r += colorAdjuster;
            GetComponent.<Renderer>().material.color.b -= colorAdjuster;
        }
    }
    thisCubeDone = true;
}