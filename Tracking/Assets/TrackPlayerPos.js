#pragma strict
import System.Collections;
import UnityEngine;
import UnityEngine.UI;
import System.Valve.VR;
//import Valve.VR;

var positionTrackingFrequency : float = 0.1;        // How often to store player position
private var timer : float = 0;                  // The timer
//private Valve.VR.EVRButtonId triggerButton = Valve.VR.EVRButtonId.k_EButton_SteamVR_Trigger;

var ViveController = 1;
static var posArray : Vector2[];                // Local array storing player position
 //private SteamVR_TrackedController left;
 var  triggerButtonDown :boolean = false;
// debug vars
private var arrayIterator : int = -1;


function Update()
{

    timer += 1 * Time.deltaTime;
   // triggerButtonDown = left.GetPressDown(triggerButton);

 if(timer % positionTrackingFrequency == 0)
 {
     storePos();
 }

}


function storePos()
{ 
    timer = 0;


 var localArray : Array = new Array();
 if(posArray != null)
     localArray = new Array(posArray);
 localArray.Push(Vector2(transform.position.x, transform.position.z) );
 posArray = localArray.ToBuiltin(Vector2);
 arrayIterator++;
 Debug.Log(" " + posArray[arrayIterator] + "  Iteration =  " + arrayIterator);

}

var heightToOverlay : int = 10;
var theHeat : GameObject;


public static var finished : boolean = false;


function Start()
{
    var pass : Vector2[] = posArray;
//  Debug.Log("" + pass.length);
	if (SteamVR_Controller.Input (viveControllerOne).GetAxis(Valve.VR.EVRButtonId.k_EButton_Axis0)) {
		Debug.Log("GotHairTriggerDown");
	} else {
		Debug.Log("GetHairTriggerDown");
	}
	if (triggerButtonDown)
	{
         readData(pass);
         finished = true;
    }
   
}


function readData(curArray : Vector2[])
{
	var iterator:int;
    for(iterator = 0; iterator < curArray.length; iterator++)
    {
        Instantiate(theHeat, Vector3(curArray[iterator].x, heightToOverlay, curArray[iterator].y), transform.rotation);
    }

	
}