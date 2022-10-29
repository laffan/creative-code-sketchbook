using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{

    public CharacterController controller;
    public float speed = 12f;
    Vector3 velocity;
    public float gravity = -19.81f;
    public float jumpHeight = 3f;

    public Transform groundCheck;
    public float groundDistance = 0.4f;
    public LayerMask groundMask;
    bool isGrounded; 


    void Update()
    {

      // Use a CheckSphere (virtual mesh) to determine if touching a particlar layerMask (ground)
      isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
      if(isGrounded && velocity.y < 0 ) {
        velocity.y = -2f;
      }

      float x = Input.GetAxis("Horizontal");
      float z = Input.GetAxis("Vertical");
      Vector3 move = transform.right * x + transform.forward * z;

      // Move controller
      controller.Move( move * speed * Time.deltaTime );

      if (Input.GetButtonDown("Jump") && isGrounded) {
        velocity.y = Mathf.Sqrt( jumpHeight * -2f * gravity );
      }
      velocity.y += gravity * Time.deltaTime;
      
      // Always check to see if floor underneath & fall with a building velocity.
      controller.Move( velocity * Time.deltaTime );
    }
}
