using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Valve.VR;

public class track : MonoBehaviour {

    private SteamVR_TrackedController left;

	public Text winText;


	private int count;

	void Start ()
	{
        winText.text = "";
	}

	void Update ()
	{
		winText.text = "X: " + transform.localPosition.x.ToString () + "  Z: "+ transform.localPosition.z.ToString();
		//Debug.Log (GameObject.Find("Controller (left)").transform.position.x);

	}


}
