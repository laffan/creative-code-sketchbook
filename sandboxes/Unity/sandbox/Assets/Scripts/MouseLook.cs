using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MouseLook : MonoBehaviour
{

    public float mouseSensitivity = 100f;
    public Transform playerBody;

    float xRotation = 0f;

    // Start is called before the first frame update
    void Start()
    {
        // hide/lock our cursor to center of screen
        Cursor.lockState = CursorLockMode.Locked;
    }

    // Update is called once per frame
    void Update()
    {
      // timeDeltatime to make sure look speed is disconnected from framerate
      float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
      float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

      xRotation -= mouseY;

      // Prevent player from looking past straight up.
      xRotation = Mathf.Clamp(xRotation, -90f, 90f);
      // Use Quaternion instead of rotate so Math.Clamp can be used.
      transform.localRotation = Quaternion.Euler( xRotation, 0f, 0f);

      playerBody.Rotate(Vector3.up * mouseX);

        
    }
}
