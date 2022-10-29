using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraRotate : MonoBehaviour
{

  public GameObject target;//the target object
  public float speed = 10.0f;//a speed modifier
  private Vector3 point;//the coord to the point where the camera looks at
  public float distance = 1f;//the coord to the point where the camera looks at
  public float height = 0f;//the coord to the point where the camera looks at

  void Start()
  {//Set up things on the start method
    transform.position = new Vector3(distance, height, transform.position.z);
    
    point = target.transform.position;//get target's coords
    transform.LookAt(point);//makes the camera look to it

  }

  void Update()
  {//makes the camera rotate around "point" coords, rotating around its Y axis, 20 degrees per second times the speed modifier
    transform.RotateAround(point, new Vector3(0.0f, 1.0f, 0.0f), 20 * Time.deltaTime * speed);
  }

}
