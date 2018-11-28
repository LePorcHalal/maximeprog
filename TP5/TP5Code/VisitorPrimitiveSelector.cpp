///////////////////////////////////////////////////////////
//  VisitorPrimitiveSelector.cpp
//  Implementation of the Class VisitorPrimitiveSelector
//  Created on:      07-nov.-2018 21:20:38
//  Original author: p482457
///////////////////////////////////////////////////////////

#include <exception>

#include "VisitorPrimitiveSelector.h"
#include "Cube.h"
#include "Cylinder.h"
#include "Sphere.h"
#include "Object3DComposite.h"
#include "TransformedObject3D.h"

VisitorPrimitiveSelector::VisitorPrimitiveSelector(PRIMITIVE_TYPE typ)
	: m_type(typ)
{
}

VisitorPrimitiveSelector::~VisitorPrimitiveSelector()
{
}

void VisitorPrimitiveSelector::visitCube(class Cube& cub)
{
	// A COMPLETER:
	// Verifier que la pile d'objets courants n'est pas vide
	// Verifier que le type de la primitive est bien celui recherchee
	// Si oui, ajouter la primitive dans les objets selectionnes
	if (!m_currentObjStack.empty()) {
		if (m_type == PRIMITIVE_TYPE::Cube_t) {
			m_selectObjContainer.push_back(*m_currentObjStack.begin());
		}
	}
}

void VisitorPrimitiveSelector::visitCylinder(class Cylinder& cyl)
{
	// A COMPLETER:
	// Verifier que la pile d'objets courants n'est pas vide
	// Verifier que le type de la primitive est bien celui recherchee
	// Si oui, ajouter la primitive dans les objets selectionnes
	if (!m_currentObjStack.empty()) {
		if (m_type == PRIMITIVE_TYPE::Cylinder_t) {
			m_selectObjContainer.push_back(*m_currentObjStack.begin());
		}
	}
}

void VisitorPrimitiveSelector::visitObjComposite(const Object3DComposite& comp)
{
	throw(std::invalid_argument("VisitorPrimitiveSelector cannot process const Objects"));
}

void VisitorPrimitiveSelector::visitObjComposite(class Object3DComposite& comp)
{
	// A COMPLETER:
	// Iterer sur les enfants du composite
	//		- Stocker l'enfant sur la pile des objets courants
	//		- Traiter l'enfant
	//		- Retirer l'enfant de sur la pile
	for (Object3DIterator it = comp.begin(); it != comp.end(); it++) {
		m_currentObjStack.push_front(it);
		it->accept(*this);
		m_currentObjStack.pop_front();
	}
}

void VisitorPrimitiveSelector::visitPrimitive(const class PrimitiveAbs& prim)
{
	throw(std::invalid_argument("VisitorPrimitiveSelector cannot process const Objects"));
}

void VisitorPrimitiveSelector::visitPrimitive(class PrimitiveAbs& prim)
{
	// Type de primitive inconnue... cette primitive n'est pas selectionnee
}

void VisitorPrimitiveSelector::visitSphere(class Sphere& sph)
{
	// A COMPLETER:
	// Verifier que la pile d'objets courants n'est pas vide
	// Verifier que le type de la primitive est bien celui recherchee
	// Si oui, ajouter la primitive dans les objets selectionnes
	if (!m_currentObjStack.empty()) {
		if (m_type == PRIMITIVE_TYPE::Sphere_t) {
			m_selectObjContainer.push_back(m_currentObjStack.front());
		}
	}
}

void VisitorPrimitiveSelector::visitTransformedObj(class TransformedObject3D& tobj)
{
	// A COMPLETER:
	// Deleguer le traitement a la primitive contenue dans le decorateur 
	tobj.getObject3D().accept(*this);
}

void VisitorPrimitiveSelector::getSelectObjects(Obj3DIteratorContainer & objContainer)
{
	// A COMPLETER:
	// Transferer les objets selectionnes du conteneur local au visiteur
	// vers le conteneur fourni en argument
	for (auto it : m_selectObjContainer) {
		objContainer.push_back(it);
	}
}
