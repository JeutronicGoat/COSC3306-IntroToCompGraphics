#include <GL/freeglut.h>

void display() //function that defines the display graphics
{
    glClear(GL_COLOR_BUFFER_BIT); //clears display window
    
    glMatrixMode(GL_PROJECTION); //sets up projection transformation analogous to camera lens. It determines field of view and volume. More about this later
    glLoadIdentity(); //loads identity matrix, more about this later
    double w = glutGet( GLUT_WINDOW_WIDTH ); //sets up display window width
    double h = glutGet( GLUT_WINDOW_HEIGHT ); //sets up display window height
    glOrtho( 0, w, 0, h, -1, 1 ); //define orthogonal projection

    glMatrixMode( GL_MODELVIEW ); //sets up matrix operations for modelview matrix stack (more about this later) 
    glLoadIdentity(); //load identity matrix. It resets the matrix back to its default state, so translations and rotations are again based from the origin.
    const char* text_to_show = "Hello world !!!!";
    glRasterPos2i(300, 400 ); //text position (x_position, y_position)
    glutBitmapString(GLUT_BITMAP_HELVETICA_10, (const unsigned char*)text_to_show);
    
    //this displays a beautiful square:
    glMatrixMode(GL_PROJECTION); //more about this later
     glColor3f( 1.0f, 1.0f, 0.0f ); //square colour yellow
    glLoadIdentity(); //load identity matrix.  It resets the matrix back to its default state, so translations and rotations are again based from the origin.
    glBegin(GL_POLYGON); //we define a small square. Technically that's a cube, but we show just one of its sides.
        glVertex3f(0.0, 0.0, 0.0);
        glVertex3f(0.5, 0.0, 0.0);
        glVertex3f(0.5, 0.5, 0.0);
        glVertex3f(0.0, 0.5, 0.0);
    glEnd(); //by default the square (a cube's side) starts rendered by default (one of its vertices) at the centre of the window.
    

    glFlush(); // send all output to display 

}

int main( int argc, char **argv )
{
    glutInit( &argc, argv ); //initialize FreeGLUT
    glutInitDisplayMode(GLUT_SINGLE); //Initialize display as single frame buffer
    glutInitWindowSize(640,480); //sets up display window (width, height)
    glutCreateWindow( "Hello world example" ); //Adds a window label and create window
    glutDisplayFunc(display); //it runs the function that contains text and other graphics definitions such as the yellow cube.
    glutMainLoop(); //sets up a continuous loop for redrawing graphics
    return 0;
}
