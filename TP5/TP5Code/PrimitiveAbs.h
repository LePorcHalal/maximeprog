///////////////////////////////////////////////////////////
//  PrimitiveAbs.h
//  Implementation of the Class PrimitiveAbs
//  Created on:      25-oct.-2018 20:47:13
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_6BDCBA85_2DD8_4e3e_B271_E0601FF9CA6C__INCLUDED_)
#define EA_6BDCBA85_2DD8_4e3e_B271_E0601FF9CA6C__INCLUDED_

#include "Object3DAbs.h"

class PrimitiveAbs : public Object3DAbs
{
public:
	PrimitiveAbs(const Point3D& pt);
	PrimitiveAbs(Object3DAbs& parent);
	PrimitiveAbs(Object3DAbs& parent, const Point3D& pt);
	virtual ~PrimitiveAbs();
	virtual PrimitiveAbs* clone(Object3DAbs& parent) const = 0;

	// Toutes les methodes de gestion des enfants ne font rien
	virtual void addChild(const Object3DAbs& obj3d);
	virtual Object3DIterator begin();
	virtual Object3DIterator_const cbegin() const;
	virtual Object3DIterator_const cend() const;
	virtual Object3DIterator end();
	virtual void removeChild(Object3DIterator_const obj3dIt);
	virtual void replaceChild(Object3DIterator obj3dIt, const Object3DAbs& newObj);

	virtual Point3D getCenter() const;
	virtual void moveCenter(const Point3D& delta);
	virtual void setCenter(const Point3D& center);

	virtual void accept(class Object3DVisitorAbs& vis) const;
	virtual void accept(class Object3DVisitorAbs& vis);

protected:
	Point3D m_center;

private:
	static Object3DContainer m_emptyContainer;
};
#endif // !defined(EA_6BDCBA85_2DD8_4e3e_B271_E0601FF9CA6C__INCLUDED_)
