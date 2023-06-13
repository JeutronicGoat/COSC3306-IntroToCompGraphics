/*
 A program for showing the Utah teapot in 3D. 
 * Modified from OpenGL Programming Guide (red book) by MGR - 071103
 *Ver. 2
 *Sep. 1, 2020
 */

#include <stdlib.h>
#include <GL/freeglut.h> /* The Freeglut library */ 

GLuint teapotList;

/*
 * Initialize depth buffer, projection matrix, light source, and lighting
 * model.  Do not specify a material property here.
 */
void init(void)
{
   GLfloat ambient[] = {0.0, 0.0, 0.0, 0.0};
   GLfloat diffuse[] = {1.0, 1.0, 1.0, 1.0};
   GLfloat specular[] = {1.0, 1.0, 1.0, 1.0};
   GLfloat position[] = {-4.0, -1.0, 2.0, 0.0}; //-6.0, -3.0, 3.0, 0.0

   GLfloat lmodel_ambient[] = {0.0, 0.0, 0.0, 0.0};
   GLfloat local_view[] = {0.0};

   glShadeModel(GL_SMOOTH);
   glLightfv(GL_LIGHT0, GL_AMBIENT, ambient);
   glLightfv(GL_LIGHT0, GL_DIFFUSE, diffuse);
   glLightfv(GL_LIGHT0, GL_POSITION, position);
   glLightModelfv(GL_LIGHT_MODEL_AMBIENT, lmodel_ambient);
   glLightModelfv(GL_LIGHT_MODEL_LOCAL_VIEWER, local_view);

   glFrontFace(GL_CW);
   glEnable(GL_LIGHTING);
   glEnable(GL_LIGHT0);
   glEnable(GL_AUTO_NORMAL);
   glEnable(GL_NORMALIZE);
   glEnable(GL_DEPTH_TEST); 
/*  be efficient--make teapot display list  */
   teapotList = glGenLists(1);
   glNewList (teapotList, GL_COMPILE);
   glutSolidTeapot(5.0);
   glEndList ();
}

/*
 * Move object into position.  Use 3rd through 12th 
 * parameters to specify the material property.  Draw a teapot.
 */
void renderTeapot(GLfloat x, GLfloat y,
   GLfloat ambr, GLfloat ambg, GLfloat ambb,
   GLfloat difr, GLfloat difg, GLfloat difb,
   GLfloat specr, GLfloat specg, GLfloat specb, GLfloat shine)
{
   GLfloat mat[4];

   glPushMatrix();
   glTranslatef(x, y, 0.0);
   mat[0] = ambr; mat[1] = ambg; mat[2] = ambb; mat[3] = 1.0;
   glMaterialfv(GL_FRONT, GL_AMBIENT, mat);
   mat[0] = difr; mat[1] = difg; mat[2] = difb;
   glMaterialfv(GL_FRONT, GL_DIFFUSE, mat);
   mat[0] = specr; mat[1] = specg; mat[2] = specb;
   glMaterialfv(GL_FRONT, GL_SPECULAR, mat);
   glMaterialf(GL_FRONT, GL_SHININESS, shine * 128.0);
   glCallList(teapotList);
   glPopMatrix();
}

/**
 *  First column:  emerald, jade, obsidian, pearl, ruby, turquoise
 *  2nd column:  brass, bronze, chrome, copper, gold, silver
 *  3rd column:  black, cyan, green, red, white, yellow plastic
 *  4th column:  black, cyan, green, red, white, yellow rubber
 */
void display(void)
{
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
       renderTeapot(8.0, 8.0, 0.5, 0.0, 0.0, 0.1, 0.1, 0.6, 0.9, 0.1, 0.1, 0.8);
       glFlush();
}

void reshape(int w, int h)
{
   glViewport(0, 0, (GLsizei) w, (GLsizei) h);
   glMatrixMode(GL_PROJECTION);
   glLoadIdentity();
   if (w <= h)
      glOrtho(0.0, 16.0, 0.0, 16.0*(GLfloat)h/(GLfloat)w,
              -10.0, 10.0);
   else
      glOrtho(0.0, 16.0*(GLfloat)w/(GLfloat)h, 0.0, 16.0,
              -10.0, 10.0);
   glMatrixMode(GL_MODELVIEW);
}

void keyboard(unsigned char key, int x, int y)
{
   switch (key) {
      case 27:
         exit(0);
         break;
   }
}


int main(int argc, char **argv)
{
   glutInit(&argc, argv);
   glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB | GLUT_DEPTH);
   glutInitWindowSize(800, 600);
   glutInitWindowPosition(50,50);
   glutCreateWindow(argv[0]);
   init();
   glutReshapeFunc(reshape);
   glutDisplayFunc(display);
   glutKeyboardFunc (keyboard);
   glutMainLoop();
   return 0;
}
