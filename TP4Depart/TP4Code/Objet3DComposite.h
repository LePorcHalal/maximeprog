///////////////////////////////////////////////////////////
//  Objet3DComposite.h
//  Implementation of the Class Objet3DComposite
//  Created on:      25-oct.-2018 20:40:33
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_B3F4EF6C_5851_4239_9FC3_5E8BB6446332__INCLUDED_)
#define EA_B3F4EF6C_5851_4239_9FC3_5E8BB6446332__INCLUDED_

#include "Objet3DAbs.h"

class Objet3DComposite : public Objet3DAbs
{

public:
	Objet3DComposite();
	Objet3DComposite(const Objet3DComposite& mdd);
	virtual ~Objet3DComposite();
	virtual Objet3DComposite* clone() const;

	virtual void addChild(const Objet3DAbs& obj3d);
	virtual Objet3DIterator begin();
	virtual Objet3DIterator_const cbegin() const;
	virtual Objet3DIterator_const cend() const;
	virtual Objet3DIterator end();
	virtual void removeChild(Objet3DIterator_const obj3dIt);

	virtual Point3D getCenter() const;
	virtual void moveCenter(const Point3D& delta);
	virtual void setCenter(const Point3D& center);

	virtual size_t getNbParameters() const;
	virtual PrimitiveParams getParameters() const;
	virtual void setParameter(size_t pIndex, float pValue);

protected:
	Point3D computeCenter() const;

	virtual std::ostream& toStream(std::ostream& o) const;
	static size_t outputIndent;

	Objet3DContainer m_objetContainer;
};
#endif // !defined(EA_B3F4EF6C_5851_4239_9FC3_5E8BB6446332__INCLUDED_)
