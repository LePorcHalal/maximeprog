///////////////////////////////////////////////////////////
//  Object3DVisitorAbs.cpp
//  Implementation of the Class Object3DVisitorAbs
//  Created on:      02-nov.-2018 17:57:42
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "Object3DVisitorAbs.h"
#include "Cube.h"
#include "Cylinder.h"
#include "Sphere.h"
#include "Object3DComposite.h"
#include "TransformedObject3D.h"

void Object3DVisitorAbs::visitCube(const Cube& cub)
{ 
	visitPrimitive(cub); 
}

void Object3DVisitorAbs::visitCylinder(const Cylinder& cyl) 
{ 
	visitPrimitive(cyl); 
}

void Object3DVisitorAbs::visitSphere(const Sphere& sph) 
{ 
	visitPrimitive(sph); 
}

void Object3DVisitorAbs::visitTransformedObj(const class TransformedObject3D& tobj) 
{ 
	//visitPrimitive(tobj); 
}

void Object3DVisitorAbs::visitCube(class Cube& cub) 
{ 
	visitCube((const Cube&)cub); 
}

void Object3DVisitorAbs::visitCylinder(class Cylinder& cyl) 
{ 
	visitCylinder((const Cylinder&)cyl); 
}

void Object3DVisitorAbs::visitObjComposite(class Object3DComposite& comp) 
{ 
	visitObjComposite((const Object3DComposite&)comp); 
}

void Object3DVisitorAbs::visitSphere(class Sphere& sph) 
{ 
	visitSphere((const Sphere&)sph); 
}

void Object3DVisitorAbs::visitTransformedObj(class TransformedObject3D& tobj) 
{ 
	visitTransformedObj((const TransformedObject3D&)tobj); 
}

void Object3DVisitorAbs::visitPrimitive(PrimitiveAbs& prim)
{ 
	visitPrimitive((const PrimitiveAbs&)prim); 
};

void Object3DVisitorAbs::defaultVisitObjComposite(const Object3DComposite & comp)
{
	for (auto it = comp.cbegin(); it != comp.cend(); ++it)
		it->accept(*this);
}
