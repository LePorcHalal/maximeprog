///////////////////////////////////////////////////////////
//  TransformedObject3D.cpp
//  Implementation of the Class TransformedObject3D
//  Created on:      26-oct.-2018 17:42:19
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "TransformedObject3D.h"
#include "Object3DVisitorAbs.h"

TransformedObject3D::TransformedObject3D(const PrimitiveAbs& obj3d, const Point3D & translat, float scal)
	: PrimitiveAbs(obj3d.getCenter()), m_Object3d(obj3d.clone(const_cast<Object3DAbs&>(obj3d.getParent()))),
	  m_translation(translat), m_scale(scal)
{
}

TransformedObject3D::TransformedObject3D(Object3DAbs& parent, const PrimitiveAbs& obj3d, const Point3D & translat, float scal)
	: PrimitiveAbs(parent, obj3d.getCenter()), m_Object3d(obj3d.clone(parent)), m_translation(translat), m_scale(scal)
{
}

TransformedObject3D::TransformedObject3D(Object3DAbs& parent, const TransformedObject3D & mdd)
	: PrimitiveAbs(parent, mdd.m_Object3d->getCenter()), m_Object3d(mdd.m_Object3d->clone(parent)),
	  m_scale(mdd.m_scale), m_translation(mdd.m_translation)
{
}

TransformedObject3D::~TransformedObject3D(){

}

TransformedObject3D* TransformedObject3D::clone(Object3DAbs& parent) const
{
	return new TransformedObject3D(parent, *this);
}

void TransformedObject3D::addChild(const Object3DAbs& obj3d){
	// Deleguer a l'Objet decore la tache d'ajouter un enfant
	m_Object3d->addChild(obj3d);
}


Object3DIterator TransformedObject3D::begin(){

	return  m_Object3d->begin();
}


Object3DIterator_const TransformedObject3D::cbegin() const {

	return m_Object3d->cbegin();
}


Object3DIterator_const TransformedObject3D::cend() const {

	return m_Object3d->cend();
}




Object3DIterator TransformedObject3D::end()
{
	return m_Object3d->end();
}


Point3D TransformedObject3D::getCenter() const 
{
	return m_Object3d->getCenter() + m_translation;
}


size_t TransformedObject3D::getNbParameters() const 
{
	return m_Object3d->getNbParameters();
}


PrimitiveParams TransformedObject3D::getParameters() const 
{
	PrimitiveParams params = m_Object3d->getParameters();
	for (int iparam = 0; iparam < params.size(); ++iparam)
		params[iparam] *= m_scale;
	return params;
}


void TransformedObject3D::moveCenter(const Point3D& delta){
	m_translation += delta;
}


void TransformedObject3D::removeChild(Object3DIterator_const obj3dIt)
{
	// Deleguer a l'Object decore la tache d'eliminer un enfant
	m_Object3d->removeChild(obj3dIt);
}


void TransformedObject3D::setCenter(const Point3D& center){
	m_Object3d->setCenter(center);
}


void TransformedObject3D::setParameter(size_t pIndex, float pValue)
{
	m_Object3d->setParameter(pIndex, pValue);
}

float TransformedObject3D::getScale() const
{
	return m_scale;
}

void TransformedObject3D::setScale(float scal)
{
	m_scale = scal;
}

Point3D TransformedObject3D::getTranslation() const
{
	return m_translation;
}

void TransformedObject3D::setTranslation(const Point3D & translat)
{
	m_translation = translat;
}

PrimitiveAbs& TransformedObject3D::getObject3D()
{
	return *m_Object3d;
}

const PrimitiveAbs& TransformedObject3D::getObject3D() const
{
	return *m_Object3d;
}

void TransformedObject3D::accept(Object3DVisitorAbs & vis) const
{
	vis.visitTransformedObj(*this);
}

void TransformedObject3D::accept(Object3DVisitorAbs & vis)
{
	vis.visitTransformedObj(*this);
}


std::ostream& TransformedObject3D::toStream(std::ostream& o) const 
{
	o << "Transformed Object: Object={ " << *m_Object3d 
	  << " }, Translation = " << m_translation << ", Scale = " << m_scale << " }" << std::endl;

	return  o;
}