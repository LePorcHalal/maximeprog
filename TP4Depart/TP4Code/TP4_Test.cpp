///////////////////////////////////////////////////////////
//  TP4_Test.cpp
//  Implementation of the Class TP4_Test
//  Created on:      29-oct.-2018 09:22:46
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "TP4_Test.h"
#include "Cube.h"
#include "Cylinder.h"
#include "Sphere.h"


TP4_Test::TP4_Test()
	: m_icone3D(), m_cylTransformed(Cylinder(Point3D(2.5f,1.5f,0.),2,5),Point3D(0.5f,0.5f,0.5f),3)
{
	Cube     cub1(Point3D(1., 2., 3.), 2., 2., 2.);
	Cube     cub2(Point3D(-1., 2., 4.), 2.5f, 2.1f, 4.);
	Cylinder cyl1(Point3D(3., -1., 1.), 1., 2.);
	Cylinder cyl2(Point3D(2., 1., 2.), 1., 2.);
	Sphere   sph1(Point3D(2., 2., 2.), 2.);
	Sphere   sph2(Point3D(3., -1., 1.), 3.5);

	Objet3DComposite compos1;
	compos1.addChild(cub1);
	compos1.addChild(cyl1);
	compos1.addChild(sph1);

	Objet3DComposite compos2;
	compos2.addChild(sph1);
	compos2.addChild(compos1);
	compos2.addChild(cub1);
	compos2.addChild(cyl2);

	m_icone3D.addChild(cub2);
	m_icone3D.addChild(compos2);
	m_icone3D.addChild(sph2);
	m_icone3D.addChild(compos1);
}

TP4_Test::~TP4_Test()
{
}

TP4_Test::RESULTAT TP4_Test::testComposite()
{
	Objet3DIterator_const itIcone = m_icone3D.cbegin();
	if (itIcone == m_icone3D.cend())
	{
		std::cout << "===== testComposite TEST 1 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testComposite TEST 1 SUCCES" << std::endl;

	PrimitiveParams paramsCub2 = itIcone->getParameters();
	if(paramsCub2[2] != 4.)
	{
		std::cout << "===== testComposite TEST 2 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testComposite TEST 2 SUCCES" << std::endl;

	++itIcone;
	if (itIcone->cbegin() == itIcone->cend())
	{
		std::cout << "===== testComposite TEST 3 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testComposite TEST 3 SUCCES" << std::endl;

	Objet3DIterator_const itCompos2 = itIcone->cbegin();
	if (itCompos2->cbegin() != itCompos2->cend())
	{
		std::cout << "===== testComposite TEST 4 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testComposite TEST 4 SUCCES" << std::endl;

	PrimitiveParams paramsSph1 = itCompos2->getParameters();
	if(paramsSph1.size() != 1)
	{
		std::cout << "===== testComposite TEST 5 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testComposite TEST 5 SUCCES" << std::endl;

	++itCompos2; ++itCompos2;  ++itCompos2;
	PrimitiveParams paramsCyl2 = itCompos2->getParameters();
	if (paramsCyl2.size() != 2)
	{
		std::cout << "===== testComposite TEST 6 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testComposite TEST 6 SUCCES" << std::endl;

	std::cout << m_icone3D << std::endl;

	return SUCCES;
}

TP4_Test::RESULTAT TP4_Test::testDecorator()
{
	Point3D resultatTransform1(3., 2., 0.5f);
	Point3D centreTransform = m_cylTransformed.getCenter();

	if (centreTransform != resultatTransform1)
	{
		std::cout << "===== testDecorator TEST 1 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testDecorator TEST 1 SUCCES" << std::endl;

	PrimitiveParams paramsCylTransformed = m_cylTransformed.getParameters();
	if(paramsCylTransformed[0] != 6.)
	{
		std::cout << "===== testDecorator TEST 2 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testDecorator TEST 2 SUCCES" << std::endl;

	if (paramsCylTransformed[1] != 15.)
	{
		std::cout << "===== testDecorator TEST 3 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testDecorator TEST 3 SUCCES" << std::endl;

	m_cylTransformed.setScale(2.);
	paramsCylTransformed = m_cylTransformed.getParameters();
	if (paramsCylTransformed[0] != 4.)
	{
		std::cout << "===== testDecorator TEST 4 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testDecorator TEST 4 SUCCES" << std::endl;

	if (paramsCylTransformed[1] != 10.)
	{
		std::cout << "===== testDecorator TEST 5 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testDecorator TEST 5 SUCCES" << std::endl;

	m_cylTransformed.setTranslation(Point3D(1., 1., 1.));
	Point3D resultatTransform2(3.5f, 2.5f, 1.);
	if (centreTransform != resultatTransform2)
	{
		std::cout << "===== testDecorator TEST 6 ECHEC" << std::endl;
		return ECHEC;
	}

	std::cout << "===== testDecorator TEST 6 SUCCES" << std::endl;

	std::cout << m_cylTransformed << std::endl;

	return SUCCES;
}