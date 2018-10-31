///////////////////////////////////////////////////////////
//  PrimitiveAbs.h
//  Implementation of the Class PrimitiveAbs
//  Created on:      25-oct.-2018 20:47:13
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_6BDCBA85_2DD8_4e3e_B271_E0601FF9CA6C__INCLUDED_)
#define EA_6BDCBA85_2DD8_4e3e_B271_E0601FF9CA6C__INCLUDED_

#include "Objet3DAbs.h"

class PrimitiveAbs : public Objet3DAbs
{
public:
	PrimitiveAbs();
	PrimitiveAbs(const Point3D& pt);
	virtual ~PrimitiveAbs();

	// Toutes les methodes de gestion des enfants ne font rien
	virtual void addChild(const Objet3DAbs& obj3d);
	virtual Objet3DIterator begin();
	virtual Objet3DIterator_const cbegin() const;
	virtual Objet3DIterator_const cend() const;
	virtual Objet3DIterator end();
	virtual void removeChild(Objet3DIterator_const obj3dIt);

	virtual Point3D getCenter() const;
	virtual void moveCenter(const Point3D& delta);
	virtual void setCenter(const Point3D& center);

protected:
	Point3D m_center;

private:
	static Objet3DContainer m_emptyContainer;
};
#endif // !defined(EA_6BDCBA85_2DD8_4e3e_B271_E0601FF9CA6C__INCLUDED_)
