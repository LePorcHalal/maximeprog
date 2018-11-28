///////////////////////////////////////////////////////////
//  Object3DComposite.cpp
//  Implementation of the Class Object3DComposite
//  Created on:      25-oct.-2018 20:40:33
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "Object3DComposite.h"
#include "Object3DVisitorAbs.h"

Object3DComposite::Object3DComposite()
{
}

Object3DComposite::Object3DComposite(Object3DAbs& parent)
	: Object3DAbs(parent)
{
}

Object3DComposite::Object3DComposite(Object3DAbs& parent, const Object3DComposite & mdd)
	: Object3DAbs(parent)
{
	for (auto it = mdd.cbegin(); it != mdd.cend(); ++it)
		addChild(*it);
}

Object3DComposite::~Object3DComposite(){

}

Object3DComposite * Object3DComposite::clone(Object3DAbs& parent) const
{
	return new Object3DComposite( parent, *this );
}

void Object3DComposite::addChild(const Object3DAbs& obj3d)
{
	m_ObjectContainer.push_back(Object3DPtr(obj3d.clone(*this)));
}

Object3DIterator Object3DComposite::begin(){

	return m_ObjectContainer.begin();
}

Object3DIterator_const Object3DComposite::cbegin() const {

	return m_ObjectContainer.cbegin();
}

Object3DIterator_const Object3DComposite::cend() const {

	return m_ObjectContainer.cend();
}

Object3DIterator Object3DComposite::end(){

	return m_ObjectContainer.end();
}

Point3D Object3DComposite::getCenter() const {
	
	return computeCenter();
}

size_t Object3DComposite::getNbParameters() const 
{
	return 0;
}

PrimitiveParams Object3DComposite::getParameters() const {

	return  PrimitiveParams();
}

void Object3DComposite::removeChild(Object3DIterator_const obj3dIt)
{
	m_ObjectContainer.erase(obj3dIt);
}

void Object3DComposite::replaceChild(Object3DIterator obj3dIt, const Object3DAbs & newObj)
{
	Object3DBaseIterator itBase(obj3dIt);
	Object3DPtr& objp = *itBase;
	objp.reset(newObj.clone(*this));
}

void Object3DComposite::moveCenter(const Point3D & delta)
{
	for (auto it = begin(); it != end(); ++it)
		it->moveCenter(delta);
}

void Object3DComposite::setCenter(const Point3D& center){
	auto delta = center - computeCenter();
	moveCenter(delta);
}

void Object3DComposite::setParameter(size_t pIndex, float pValue){

}

void Object3DComposite::accept(Object3DVisitorAbs & vis) const
{
	vis.visitObjComposite(*this);
}

void Object3DComposite::accept(Object3DVisitorAbs & vis)
{
	vis.visitObjComposite(*this);
}

Point3D Object3DComposite::computeCenter() const
{
	// Calcul la moyenne des centres de tous les enfants
	// S'il n'y a pas d'enfant, initialise a (0,0,0)
	Point3D m_center;
	int nChildren = 0;
	for( auto it = cbegin(); it != cend(); ++it, ++nChildren)
		m_center += it->getCenter();

	if(nChildren > 0)
		m_center /= float(nChildren);

	return m_center;
}

// Variable statique permettant de stocker le niveau d'indentation
size_t Object3DComposite::outputIndent = 0;

std::ostream& indentation(std::ostream& o, size_t indentLevel)
{
	for (auto iindent = 0; iindent < indentLevel; ++iindent)
		o << "\t";
	return o;
}

std::ostream & Object3DComposite::toStream(std::ostream & o) const
{
	o << "Composite: center = " << computeCenter() << ": {" << std::endl;
	++outputIndent;
	for (auto it = cbegin(); it != cend(); ++it)
		indentation(o, outputIndent) << *it << std::endl;
	--outputIndent;
	indentation(o, outputIndent) << "}";

	return o;
}
